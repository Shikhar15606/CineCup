import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
const useStyles = makeStyles({
  socialMediaPopper: {
    top: '300px  !important',
    left: 'unset !important',
    right: '0px !important',
    display: 'grid',
  },
  socialMediaButton: {
    margin: 5,
  },
});
export default function ShareButton(props) {
  const classes = useStyles();
  return (
    <>
      <FacebookShareButton
        url={props.url}
        quote={props.title}
        hashtag='#cinecup'
        className={classes.socialMediaButton}
      >
        <FacebookIcon size={32} />
      </FacebookShareButton>
      <TwitterShareButton
        url={props.url}
        title={props.title}
        hashtag='#cinecup'
        className={classes.socialMediaButton}
      >
        <TwitterIcon size={32} />
      </TwitterShareButton>
      <WhatsappShareButton
        url={props.url}
        title={props.title}
        separator=':: '
        className={classes.socialMediaButton}
      >
        <WhatsappIcon size={32} />
      </WhatsappShareButton>
    </>
  );
}
