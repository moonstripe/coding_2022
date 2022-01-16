import * as React from "react"
import { Box, Card, Typography, CardMedia, CardHeader, CardContent, CardActions, IconButton, Button, Link } from '@mui/material';
import { gql, useQuery } from '@apollo/client'
import { useParams } from "react-router-dom"
const BlockContent = require('@sanity/block-content-to-react')

const POST = gql`
    query GetPost ($slug: String!) {
        allPost( where: {
            slug: {current: {eq: $slug}}
          }) {
            title
            bodyRaw
            publishedAt
            author {
                name
            }
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

export const Post = () => {

    let { slug } = useParams();

    const { loading, error, data } = useQuery(POST, {
        variables: { slug },
    });

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log(slug)
        console.log(error)
        return <p>Error :(</p>
    };

    return (
        <Box sx={{ my: 1 }}>
            {data.allPost.map(({ title, publishedAt, author, bodyRaw, slug, mainImage }) => (
                <Card>
                    {
                        mainImage ? <CardMedia height='194' width='100%' onClick={() => console.log(mainImage.asset)} component="img" image={mainImage ? mainImage.asset.url : null} alt={mainImage ? mainImage.asset.description : null} /> : null
                    }

                    <CardHeader
                        sx={{ color: 'rgb(181,33,49)' }}
                        title={title}
                        subheader={`${new Date(publishedAt).toLocaleDateString()} - ${author.name === 'moonstripe' ? 'me' : author.name}`}
                    />
                    <CardContent>
                        <Typography variant="body2" >
                        <BlockContent blocks={bodyRaw} />
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}
