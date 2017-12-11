import React from 'react';

// Winter Ride by Twin Musicom
// License: Creative Commons Attribution license (https://creativecommons.org/licenses/by/4.0/)
// Source: http://www.twinmusicom.org/song/308/winter-ride
// Artist: http://www.twinmusicom.org
// Media: http://www.twinmusicom.org/files/2014/5741/4496/Winter_Ride.mp3

// Only limited styling possible with default media player
// Obviously, a custom JavaScript player will be the way to go on a go forward basis

class Audio extends React.Component{
    render(){
        return(
            <div className="media-player">
                <h3 className="snowWhite"><a href="http://www.twinmusicom.org/song/308/winter-ride" target="_blank" rel="noopener noreferrer"> Winter Ride by Twin Musicom </a></h3>
                <audio controls loop preload="false">
                    <source src="http://www.twinmusicom.org/files/2014/5741/4496/Winter_Ride.mp3" type="audio/mp3" />
                </audio>
            </div>        
        );
    }
}

export default Audio;