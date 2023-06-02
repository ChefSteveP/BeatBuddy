import { Typography } from "@mui/material";
import UserCard from "./UserCard";

function UserCarousel({ displayText, specialInfo, users, backgroundColor, textColor }) {
    return (
        <div className="discover-carousel-outer">
            <div className="discover-carousel-middle">
                <div style={{ display: 'flex' }}>
                    <Typography variant='h4' sx={{ fontFamily: 'circular-medium', textAlign: 'left', paddingLeft: 2 }}>{users?.length ? displayText : ''}<span style={{ textDecoration: 'underline' }}>{users?.length ? specialInfo : ''}</span></Typography>
                </div>
                <div className="discover-carousel-inner">
                    {users?.map((item) => {
                        return <UserCard
                            key={item.id}
                            displayName={item.data.displayName}
                            photo={item.data.photo}
                            backgroundColor={backgroundColor}
                            textColor={textColor} />
                    })}
                </div>
            </div>
        </div>
    );
}

export default UserCarousel;