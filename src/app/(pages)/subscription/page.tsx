"use client";

const Subscription = () => {
  const subscribe = async () => {
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const { url } = await response.json();
        // console.log(data)
        console.log("Subscribe successfully.");
        window.location.assign(url);
      }
    } catch (error) {
      console.log("Error subscribing: ", error);
    }
  };

  return (
    <div>
      <button onClick={subscribe}>Upgrade</button>
    </div>
  );
};

export default Subscription;
