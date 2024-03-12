import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Contact = ({ listing }) => {
  const [landLord, setLandLord] = useState(null);
  const [message, setMessage] = useState("");

  const onchange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandLord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);

        const data = await res.json();
        setLandLord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandLord();
  }, [listing.userRef]);

  return (
    <>
      {landLord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landLord.username}</span>{" "}
            for
            <span className="font-semibold"> {listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onchange}
            placeholder="Enter Your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>
          <Link
            to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white uppercase p-3 rounded-lg text-center hover:opacity-95"
          >
            Send message
          </Link>
        </div>
      )}
    </>
  );
};
