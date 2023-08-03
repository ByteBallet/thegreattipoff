import React, { useState } from 'react';

const RenderJockeyImage = ({ data }) => {
    const [hideImage, sethideImage] = useState()
    let url = `${process.env.cdn}/images/silks/jockey-silk-${data?.RACEID}-${data?.BOOKIERUNNER}.png`;
    if (data?.RACETYPE === "G") {
        url = `${process.env.cdn}/images/greyhound/Grey-${data?.FIELDNUM}.png`;
    }

    let fallbackSrc = `${process.env.cdn}/images/silkdefault.png`;
    return (
        <img
            src={
                hideImage
                    ? fallbackSrc
                    : url
            }
            width="30px"
            height="40px"
            alt="J-image"
            onError={(e) => {
                sethideImage(true);
            }}
        />
    );
};

export default RenderJockeyImage;