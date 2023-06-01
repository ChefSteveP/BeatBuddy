function UserCard({ displayName, photo }) {
    return (
        <div className="discover-carousel-profiles" onClick={() => { /* navigate to user profile with user information */ }}>
            <img src={photo} alt={`${displayName}'s user profile`} />
            <p>{displayName}</p>
        </div>
    );
}

export default UserCard;