import React, { useRef, useState, useContext } from 'react';
import { TextField, Button, Typography, Stack } from '@mui/material';
import { UserContext } from '@Context/User/UserProvider';
import { setFollowComment } from '@services/alerts/alertsService';

const FollowComment = ({ notes, followid, id, setnotes, isRunner = false }) => {
    const [comments, setcomments] = useState(notes)
    const { user } = useContext(UserContext)
    const [disableSave, setdisableSave] = useState(false)
    const handleChange = (event) => {
        setcomments(event.target.value);
    };
    const notesRef = useRef(comments);

    const handleComments = async () => {
        let res = {}
        res = (await setFollowComment(user?.userID, id, followid, comments)) || {};
        if (!res.error && res?.data?.ERROBJ?.ERRORCODE == 0) {
            notesRef.current = comments
            setdisableSave(true)
            setnotes(comments)
        }
    }
    return (
        <React.Fragment>
            <TextField
                onChange={handleChange}
                value={comments}
                fullWidth
                id="outlined-multiline-flexible"
                multiline
                minRows={3}
                placeholder={`Add a Note for ${isRunner ? "on runner" : "for Tipster"} (optional)`}
                sx={{
                    borderColor: "grey.tipBtn",
                    '& .MuiInputBase-multiline': {
                        py: 1,
                        fontSize: 13,
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 2,
                        borderColor: "grey.tipBtn",
                    },
                    '& .MuiFormHelperText-root': {
                        textAlign: "right",
                        color: "grey.main",
                        mr: 0,
                        mt: 1
                    }
                }}
                inputProps={{
                    maxLength: 300,
                }}
            />
            <Stack direction="row" alignItems={"center"} justifyContent="space-between" sx={{ width: 1 }}>
                <Button
                    onClick={handleComments}
                    variant="text"
                    disabled={notesRef.current == comments || disableSave}
                    color="success"
                    sx={{
                        fontWeight: (notesRef.current == comments || disableSave) ? "400" : "700",
                        minWidth: "auto",
                        px: 0
                    }}>
                    Save
                </Button>
                <Typography color="grey.main" fontSize={12}>
                    {comments?.length} / 300
                </Typography>

            </Stack >
        </React.Fragment >
    );
};

export default FollowComment;