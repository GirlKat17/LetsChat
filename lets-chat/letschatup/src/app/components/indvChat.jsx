import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";
import { PrettyChatWindow} from "react-chat-engine-pretty";

export default function Page({ user }) {
  return (
    <div style={{ height: "100vh" }}>
      <button
        style={{ position: "absolute", top: "0px", left: "0px" }}
        onClick={() => signOut(auth)}
      >
        Sign Out
      </button>
      <PrettyChatWindow
        projectId="0d614fab-813f-42ca-840f-bb4bcc4ce20e"
        username={user.email || ""}
        secret={user.uid}
        style={{ height: "100%" }}
      />
    </div>
  );
}
