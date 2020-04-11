import React, { useEffect, useState } from 'react';

import { Card, CardMedia, Typography, CardContent, CardActionArea, Drawer, SwipeableDrawer, GridList, GridListTile } from '@material-ui/core';


import Axios from 'axios';
import { AXIOS_HEADERS } from "../../configs/axios-configs";
import { makeStyles } from '@material-ui/styles';

import "../../styles/feeds.css";
import { LinkedIn, Share, ThumbUp } from '@material-ui/icons';

const APIURL = 'https://covid-pulse-api.herokuapp.com/api/covid19/';

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(2),
        boxShadow: '0px 0px 0px -3px rgba(0,0,0,0.2), -2px 2px 9px 1px rgba(0,0,0,0.14), 0px 0px 9px 0px rgba(0,0,0,0.12)'
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

    useEffect(() => {
        const today = new Date();
        Axios.get(APIURL + `feeds/?page=${pageNo}&ordering=-likes`, AXIOS_HEADERS)
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
                {FeedImg(feed.imgs, size)}
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {feed.text}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    }

    const handleOnCose = (cl) => {
        console.log(cl)
    }

    return (
        <React.Fragment key="top" >
            <div className="feeds-wrapper" >
                {
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
                            <div className="likes"><ThumbUp></ThumbUp> {selectedFeed.likes}</div>
                            <div className="shares"><Share></Share> {selectedFeed.shared}</div>
                        </div>
                    </div>
                </SwipeableDrawer>
            : ''}
        </React.Fragment>
    )
};


export default Feeds;
