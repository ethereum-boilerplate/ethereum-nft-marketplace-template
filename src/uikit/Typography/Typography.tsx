import React from 'react';
import styled, { css } from 'styled-components';
// import TypographyStyles from './Typography.styles';

// const { StyledText } = TypographyStyles;

const montserrat = css`
    @import url('fonts.googleapis.com/css2?family=Montserrat');
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    letter-spacing: 0;
`;

const openSans = css`
    @import url('//fonts.googleapis.com/css?family=Open+Sans');
    font-family: 'Open Sans', sans-serif;
    font-style: normal;
    letter-spacing: 0;
`;

const heading = css`
    ${montserrat}
    -webkit-font-smoothing: antialiased;
    color: #041836;
`;

const getTypographyStyle = (variant) => {
    switch (variant) {
        case 'h1':
            return css`
                ${heading}
                font-weight: 600;
                font-size: 36px;
                line-height: 40px;
                letter-spacing: -0.75px;
            `;
        case 'h2':
            return css`
                ${heading}
                font-weight: 500;
                font-size: 32px;
                line-height: 36px;
            `;
        case 'h3':
            return css`
                ${heading}
                font-weight: bold;
                font-size: 24px;
                line-height: 32px;
            `;
        case 'h4':
            return css`
                ${heading}
                ${openSans}
                font-weight: bold;
                font-size: 20px;
                line-height: 28px;
            `;
        case 'span':
            return css`
                ${openSans}
                font-weight: 600;
                font-size: 14px;
                line-height: 24px;
                color: #68738d;
            `;
    }
};

export const Text = ({ variant, ...otherProps }) => {
    const TextType = variant;

    return <TextType {...otherProps} />;
};

const StyledText = styled(Text)`
    ${({ variant }) => getTypographyStyle(variant)}
`;

const Typography = (props) => {
    return <StyledText {...props} />;
};

export default Typography;
