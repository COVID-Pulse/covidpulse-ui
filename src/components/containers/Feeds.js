import React, { useEffect, useState } from 'react';

import { Card, CardMedia, Typography, CardContent, CardActionArea } from '@material-ui/core';


import Axios from 'axios';
import { AXIOS_HEADERS } from "../../configs/axios-configs";
import { makeStyles } from '@material-ui/styles';

import "../../styles/feeds.css";

const APIURL = 'https://covid-pulse-api.herokuapp.com/api/covid19/';

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(2),
        boxShadow : '0px 0px 0px -3px rgba(0,0,0,0.2), -2px 2px 9px 1px rgba(0,0,0,0.14), 0px 0px 9px 0px rgba(0,0,0,0.12)'
    },
    media: {
        height: 150,
    },
}));

const Feeds = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);
    const [pageNo, setPageNo] = useState(1);

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

    const FeedImg = (imgs) => {
        return eval(imgs).map( (img, i) => {
            return <CardMedia key={i}
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={img}
                title="Contemplative Reptile"/>
        })
    }

    const handleFeedClick = (e) => {
        console.log(e);
    }

    return (
        <div className="feeds-wrapper">
            {
                feeds.map((feed) => {
                    return (
                        <Card key={feed.id} className={classes.card} >
                            <CardActionArea onClick={handleFeedClick} >
                                {FeedImg(feed.imgs)}
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {feed.text}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                        </Card>
                    )
                })
            }
        </div>
    )
};


export default Feeds;
