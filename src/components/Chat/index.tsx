import { ChangeEvent, useContext, useState } from 'react';

import { collection, addDoc, serverTimestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './styles.module.scss';
import { IMessage } from '../../types';
import useAuth from '../../hooks/useAuth';
import useCollectionDataHook from '../../hooks/useCollectionDataHook';
import { COLLECTION_MESSAGES } from '../../utils/constants';
import { FirebaseContext } from '../..';
import Loading from '../Loading';

const Chat = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [editingItemId, setEditingItemId] = useState('');
  const [editingItemText, setEditingItemText] = useState('');
  const { db } = useContext(FirebaseContext);
  const { user } = useAuth();
  const collectionRef = collection(db, COLLECTION_MESSAGES);

  const [messages, loading, error] = useCollectionDataHook<IMessage>({
    collection: collectionRef,
    order: ['createdAt'],
  });

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const { uid, displayName, photoURL } = user!;

      await addDoc(collectionRef, {
        sender: { uid, displayName, photoURL },
        text: inputValue.trim(),
        createdAt: serverTimestamp(),
      });

      setInputValue('');
    } catch (error: any) {
      console.log('error', error.message);
    }
  };

  const handleEdit = async (isEditing: boolean, id: string, text: string) => {
    if (!isEditing) {
      setEditingItemText(text);
      setEditingItemId(id);
      return;
    }

    try {
      const messageDoc = doc(db, COLLECTION_MESSAGES, id);
      await updateDoc(messageDoc, { text: editingItemText });

      setEditingItemText('');
      setEditingItemId('');
    } catch (error: any) {
      console.log('error', error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const messageDoc = doc(db, COLLECTION_MESSAGES, id);
      await deleteDoc(messageDoc);

      setEditingItemText('');
      setEditingItemId('');
    } catch (error: any) {
      console.log('error', error.message);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.log('error', error);
  }

  return (
    <Container>
      <Grid container style={{ height: window.innerHeight - 90, marginTop: 20 }} justifyContent="center">
        <div className={styles.messagesContainer}>
          {messages?.map(({ id, sender, text }) => {
            const isMe = user?.uid === sender.uid;
            const isEditing = id === editingItemId;

            return (
              <div
                key={id}
                style={{
                  maxWidth: '80%',
                  margin: 10,
                  padding: 10,
                  border: `2px ${isMe ? 'solid green' : 'dashed red'}`,
                  marginLeft: isMe ? 'auto' : 10,
                  width: 'fit-content',
                }}
              >
                <Grid container alignItems="center">
                  <Avatar src={sender.photoURL} />

                  <div>{sender.displayName}</div>
                </Grid>

                {isEditing ? (
                  <TextField
                    value={editingItemText}
                    onChange={(e) => setEditingItemText(e.target.value)}
                    variant="outlined"
                    multiline
                    maxRows={2}
                  />
                ) : (
                  <div>{text}</div>
                )}

                {isMe && (
                  <div>
                    <Button variant="outlined" onClick={() => handleEdit(isEditing, id, text)}>
                      {isEditing ? 'Save' : 'Edit'}
                    </Button>
                    <Button variant="outlined" onClick={() => handleDelete(id)}>
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Grid className={styles.inputContainer} container direction="column" alignItems="flex-end">
          <TextField
            value={inputValue}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            multiline
            maxRows={2}
          />

          <Button variant="outlined" onClick={handleSendMessage}>
            Send
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
