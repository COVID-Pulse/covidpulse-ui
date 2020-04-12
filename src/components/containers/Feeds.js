import React, { useEffect, useState } from 'react';

import { Card, CardMedia, Typography, CardContent, CardActionArea, Drawer, SwipeableDrawer, GridList, GridListTile, CircularProgress, CardActions, Button, CardHeader, Avatar } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';

import Axios from 'axios';
import { makeStyles } from '@material-ui/styles';

import "../../styles/feeds.css";
import { Share, ThumbUp } from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';

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

const useStyles = makeStyles((theme) => ({
    card: {
        margin: '10px',
        // boxShadow: '0px 0px 0px -3px rgba(0,0,0,0.2), -2px 2px 9px 1px rgba(0,0,0,0.14), 0px 0px 9px 0px rgba(0,0,0,0.12)'
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

    useEffect(() => {
        const today = new Date();
        Axios.get(APIURL + `feeds/?page=${pageNo}&ordering=-likes`)
            .then((data) => {
                setFeeds(data.data.results);
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setLoading(false);
            });
    }, [])

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
                } title={feed.by} subheader={feed.created_at} >
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
                { loading ? <CircularProgress disableShrink /> :
                    feeds.map((feed) => {
                        return (
                            getFeed(feed, 1)
                        )
                    })
                }
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
                            <div className="created-date"><DateRangeIcon></DateRangeIcon> {selectedFeed.created_at}</div>
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
