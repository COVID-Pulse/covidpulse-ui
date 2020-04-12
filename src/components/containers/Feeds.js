import React, { useEffect, useState } from 'react';

import { Card, CardMedia, Typography, CardContent, CardActionArea, SwipeableDrawer, CircularProgress, CardActions, Button, CardHeader, Avatar } from '@material-ui/core';

import Axios from 'axios';
import { makeStyles } from '@material-ui/styles';

import "../../styles/feeds.css";
import { Share } from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';


const $ = window.$;

const APIURL = 'https://covid-pulse-api.herokuapp.com/api/covid19/';

function nFormatter(num) {
    if (num >= 1000000000) {
       return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
       return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
       return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}

function timeSince(timeStamp) {
    var now = new Date(),
      secondsPast = (now.getTime() - timeStamp) / 1000;
    if (secondsPast < 60) {
      return parseInt(secondsPast) + 's ago';
    }
    if (secondsPast < 3600) {
      return parseInt(secondsPast / 60) + 'm ago';
    }
    if (secondsPast <= 86400) {
      return parseInt(secondsPast / 3600) + 'h ago';
    }
    if (secondsPast > 86400) {
      let day = timeStamp.getDate();
      let month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
      let year = timeStamp.getFullYear() == now.getFullYear() ? "" : " " + timeStamp.getFullYear();
      return  "on " + day + " " + month + year;
    }
}

const useStyles = makeStyles((theme) => ({
    card: {
        margin: '10px'
    },
    media: {
        height: 150,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
}));

const Feeds = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [openanchor, setOpenAnchor] = useState(false);
    const [selectedFeed, setSelectedFeed] = useState(undefined);
    const [scrolling, setscrolling] = useState(false);
    const [reachedLastPage, setReachedLastPage] = useState(false);
    const [fetchingData, setFecthingData ] = useState(false);

    const fetchFeeds = () => {
        setFecthingData(true);
        Axios.get(APIURL + `feeds/?page=${pageNo}&ordering=-timestamp`)
            .then((data) => {
                if ( data.data.next === null ) {
                    setReachedLastPage(true);
                }
                if ( feeds.length > 0 ) {
                    setFeeds([...feeds, ...data.data.results]);
                } else {
                    setFeeds(data.data.results);
                }
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setLoading(false);
                setFecthingData(false);
            });
    }

    useEffect( () => {
        if ( !reachedLastPage && !fetchingData ) {
            fetchFeeds();
        }
    }, [pageNo])

    const FeedImg = (imgs, size) => {
        if (!imgs) {
            return;
        }
        return eval(imgs).slice(0,size).map((img, i) => {
            return <CardMedia key={i}
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={img}
                title="Contemplative Reptile" />
        })
    }

    const getFeed = (feed, size) => {
        return <Card key={feed.id} className={classes.card}  >
            <CardActionArea onClick={() => {
                setSelectedFeed(feed);
                setOpenAnchor(true);
            }}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" src={ "https://avatars.io/twitter/" + feed.username } className={classes.avatar}>
                    
                </Avatar>
                } title={feed.by} subheader={timeSince(new Date(feed.timestamp))} >
            </CardHeader>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {feed.text}
                    </Typography>
                </CardContent>
                {FeedImg(feed.imgs, size)}
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    <FavoriteIcon color="secondary" fontSize="small"></FavoriteIcon> <span style={{paddingLeft : '5px'}} >{nFormatter(feed.likes)}</span>
                </Button>
                <Button size="small" color="primary">
                    <Share fontSize="small"></Share> <span style={{paddingLeft : '5px'}} >{nFormatter(feed.shared)}</span>
                </Button>
            </CardActions>
        </Card>
    }

    const handleOnCose = (cl) => {
        
    }

    const handleScroll = (e) => {
        if ( e.target.scrollTop > 10 )  {
            setscrolling(true)
            if ( $('.feeds-wrapper').scrollTop() + $('.feeds-wrapper').height() >= $('.feeds-wrapper')[0].scrollHeight - $('.feeds-wrapper').height() ) {
                if ( !reachedLastPage ) {
                    setPageNo(pageNo + 1);
                }
            }
            return;
        }
        setscrolling(false)
    }

    return (
        <React.Fragment key="top" >
            <div className={ loading ? " feeds-wrapper centered " : "feeds-wrapper"  } onScroll={handleScroll} >
                <div className={ scrolling ? "_title float-top onscroll" : "_title float-top" }  >
                    Feeds
                </div>
                {
                                        feeds.map((feed) => {
                                            return (
                                                getFeed(feed, 1)
                                            )
                                        })
                }
                <div style={{ display : "flex", alignItems : "center", justifyContent : "center" }}>
                    {fetchingData ? <CircularProgress></CircularProgress> : ''}
                </div>
            </div>
            { selectedFeed !== undefined ? 
                <SwipeableDrawer anchor="right" onOpen={handleOnCose} open={openanchor} onClose={handleOnCose} onClick={() => setOpenAnchor(false)} >
                    <div className="feed-detail">
                        <Typography variant="body2" color="textSecondary" component="p">
                            {selectedFeed.text}
                        </Typography>
                        <div className="summary-cont">
                            <div className="likes"><FavoriteIcon color="secondary" ></FavoriteIcon> {nFormatter(selectedFeed.likes)}</div>
                            <div className="shares"><Share></Share> {nFormatter(selectedFeed.shared)}</div>
                        </div>
                        {selectedFeed.hasmedia ?
                        <div className="img-holders">
                            {FeedImg(selectedFeed.imgs, 20)}
                        </div>  : '' }
                    </div>
                </SwipeableDrawer>
            : ''}
        </React.Fragment>
    )
};


export default Feeds;
