import { useMutation } from '@apollo/client';
import { useRef, useState } from 'react';
import { createPostThreeQuery } from '../../graphql/post';
import { TextField, Button, Container } from '@material-ui/core';

//Komponent do tworzeniu postów dla widoku CQRS 3.
export function PostCreatorThree({ user, refetch }) {
    const [createPost] = useMutation(createPostThreeQuery);
    const [content, setContent] = useState('');
    const submit = useRef(0);

    return (
        <div style={{ marginTop: 50 }}>
            <Container>
                <form
                    onSubmitCapture={async (e) => {
                        e.preventDefault();

                        if (user !== null) {
                            await createPost({
                                variables: {
                                    user,
                                    content,
                                },
                            });

                            refetch();
                            setContent('');
                            submit.current.style.visibility = 'hidden';
                        }
                    }}
                >
                    <TextField
                        variant="outlined"
                        multiline
                        fullWidth
                        margin="normal"
                        placeholder="Create your post"
                        minRows={4}
                        value={content}
                        style={{ textAlign: 'left' }}
                        onChange={(e) => {
                            submit.current.style.visibility = !e.target.value
                                ? 'hidden'
                                : 'visible';
                            setContent(e.target.value);
                        }}
                    />
                    <center>
                        <Button
                            ref={submit}
                            variant="contained"
                            color="secondary"
                            type="primary"
                            style={{ visibility: 'hidden' }}
                        >
                            create a post
                        </Button>
                    </center>
                </form>
            </Container>
        </div>
    );
}
