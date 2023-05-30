import { Card, Typography, CardMedia, CardHeader, CardContent, CardActions, IconButton, Button } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client'

const POSTS = gql`
    query GetPosts {
        allPost( sort: [{ publishedAt: DESC} ] ){
            title
            author {
                name
            }
            bodyRaw
            publishedAt
            slug {
                current
            }
            mainImage {
                asset {
                    url
                    description
                }
            }
      }
    }
`

export const Blog = () => {
    const { loading, error, data } = useQuery(POSTS);

    const navigate = useNavigate();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
            {
                data.allPost.map(({ title, publishedAt, author, bodyRaw, slug, mainImage }) => (
                    <Card elevation={1} sx={{ mt: 1 }}>
                        {
                            mainImage ? <CardMedia height='194' width='100%' onClick={() => console.log(mainImage.asset)} component="img" image={mainImage ? mainImage.asset.url : null} alt={mainImage ? mainImage.asset.description : null} /> : null
                        }

                        <CardHeader
                            onClick={() => navigate(`./${slug.current}`)}
                            sx={{ color: 'rgb(181,33,49)' }}
                            title={title}
                            subheader={`${new Date(publishedAt).toLocaleDateString()} - ${author.name === 'moonstripe' ? 'me' : author.name}`}
                        />
                        <CardContent>
                            <Typography variant="body2" >
                                {bodyRaw[0].children[0].text.substring(0, 300)} ...
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton onClick={() => navigate(`./${slug.current}`)}>
                                <ReadMoreIcon sx={{ color: 'rgb(181,33,49)' }} />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))
            }

        </Box>
    )
}