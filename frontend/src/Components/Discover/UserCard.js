function UserCard({ displayName, photo, backgroundColor, textColor }) {
    return (
        <>
            {/* TODO link to user profile! */}
            <div className="discover-carousel-profile" style={{ backgroundColor: backgroundColor, color: textColor }} onClick={() => { /* navigate to user profile with user information */ }}>
                <img className="discover-user-photo" src={photo} alt={`${displayName}'s user profile`} />
                <p>{displayName}</p>
            </div>
        </>
    );
}

export default UserCard;