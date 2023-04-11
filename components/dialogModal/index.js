import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import { hideDialog } from '../../store/DialogSlice';

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

const DialogModal = ({ type }) => {
  const dispatch = useDispatch();
  const { dialog } = useSelector((state) => ({ ...state }));
  const test = dialog.msgs.find((x) => x.type === 'error');

  const handleClose = () => {
    dispatch(hideDialog());
  };

  return (
    <div className="absolute z-10">
      <Dialog
        open={dialog.show}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        disableScrollLock
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogTitle
          className={`text-white p-2 border-b-2 ${test ? 'bg-red-500' : 'bg-green-500 '}`}
        >
          {dialog.header}
        </DialogTitle>
        <DialogContent className="mt-1">
          {dialog.msgs
            && dialog.msgs.map((msg, i) => (
              <DialogContentText
                className="flex"
                id="alert-dialog-slide-description"
                key={i}
              >
                <img
                  className="w-5 h-5"
                  src={
                    msg.type === 'error'
                      ? 'https://www.freeiconspng.com/uploads/orange-error-icon-0.png'
                      : 'https://www.pngmart.com/files/20/Success-Transparent-Background.png'
                  }
                  alt=""
                />
                <span>{msg.msg}</span>
              </DialogContentText>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {dialog.link?.link && (
            <Button>
              <Link href={dialog.link.link}>
                <span>{dialog.link.text}</span>
              </Link>
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogModal;
