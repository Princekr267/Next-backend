import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/user.model";
import LogoutButton from "@/src/components/LogoutButton";

type ProfilePageProps = {
  params: Promise<{ id: string }>;
};

async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;

  if (!mongoose.isValidObjectId(id)) {
    notFound();
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let loggedInUserId: string;

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as {
      id: string;
    };
    loggedInUserId = decodedToken.id;
  } catch {
    redirect("/login");
  }

  if (loggedInUserId !== id) {
    redirect("/login");
  }

  await connect();

  const user = await User.findById(id).select(
    "username email isVerified isAdmin"
  );

  if (!user) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <div className="navbar w-full bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><LogoutButton /></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-2xl p-6">
        <h1 className="mb-6 text-4xl font-bold">Profile</h1>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{user.username}</h2>

            <div className="join mt-4 w-full">
              <span className="btn join-item rounded-l-full">Username</span>
              <input
                className="input join-item w-full text-base-content"
                value={user.username}
                readOnly
                aria-label="Username"
              />
              
            </div>
            <div className="join mt-4 w-full"> 
              <span className="btn join-item rounded-l-full">Email</span>
              <input
                className="input join-item w-full text-base-content"
                value={user.email}
                readOnly
                aria-label="Email"
              />
            </div>

            <p>Verified: {user.isVerified ? "Yes" : "No"}</p>
            <p className="break-all text-sm text-base-content/70">ID: {id}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;