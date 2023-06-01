import UserCard from "./UserCard";

function UserCarousel({ displayText, users }) {
    return (
        <>
            <h2>{users?.length ? displayText : ''}</h2>
            <div className="discover-carousel">
                {users?.map((item) => {
                    return <UserCard
                        key={item.id}
                        displayName={item.data.displayName}
                        photo={item.data.photo} />
                })}
            </div>
        </>
    );
}

export default UserCarousel;