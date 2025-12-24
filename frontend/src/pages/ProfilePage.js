export default function ProfilePage({ user }) {
  if (!user) return <div style={{padding:'2rem'}}>Login to view your profile.</div>;
  return (
    <div style={{padding:'2rem'}}>
      <h2>User Profile</h2>
      <p>Username: {user.username}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
