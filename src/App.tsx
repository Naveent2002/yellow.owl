import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Container, Typography, TextField, Button,
  Table, TableContainer, TableHead, TableRow,
  TableCell, TableBody, Paper, Avatar, Grid, Box, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme
} from '@mui/material';
import { styled } from '@mui/system';
import { Edit } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from './Navbar';

interface Student {
  id: number;
  name: string;
  email: string;
  dateOfJoining: string;
  enrollmentNumber: string;
  phoneNumber: string;
  profilePicture: string;
}

const ResponsiveContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const ResponsiveTableContainer = styled(TableContainer)(({ theme }) => ({
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    overflowX: 'auto',
    overflowY: 'hidden',
  },
}));

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState<Omit<Student, 'id'>>({
    name: '',
    email: '',
    dateOfJoining: '',
    enrollmentNumber: '',
    phoneNumber: '',
    profilePicture: ''
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editStudentId, setEditStudentId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);
  const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof Omit<Student, 'id'>) => {
    setNewStudent({ ...newStudent, [key]: e.target.value });
  };

  const addStudent = () => {
    if (Object.values(newStudent).some(field => typeof field === 'string' && field.trim() === '')) {
      alert('Please fill all the fields');
      return;
    }

    const id = students.length > 0 ? students[students.length - 1].id + 1 : 1;
    setStudents([...students, { ...newStudent, id }]);
    setNewStudent({ name: '', email: '', dateOfJoining: '', enrollmentNumber: '', phoneNumber: '', profilePicture: '' });
    setOpenFormDialog(false);
  };

  const updateStudent = (id: number) => {
    if (Object.values(newStudent).some(field => typeof field === 'string' && field.trim() === '')) {
      alert('Please fill all the fields');
      return;
    }

    setStudents(students.map(student => student.id === id ? { ...newStudent, id } : student));
    setEditMode(false);
    setEditStudentId(null);
    setNewStudent({ name: '', email: '', dateOfJoining: '', enrollmentNumber: '', phoneNumber: '', profilePicture: '' });
    setOpenFormDialog(false);
  };

  const handleDeleteClick = (id: number) => {
    setStudentToDelete(id);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    if (studentToDelete !== null) {
      setStudents(students.filter(student => student.id !== studentToDelete));
      setOpenDialog(false);
      setStudentToDelete(null);
    }
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setStudentToDelete(null);
  };

  const editStudent = (id: number) => {
    const studentToEdit = students.find(student => student.id === id);
    if (studentToEdit) {
      setNewStudent(studentToEdit);
      setEditMode(true);
      setEditStudentId(id);
      setOpenFormDialog(true);
    }
  };

  const handleOpenFormDialog = () => {
    setEditMode(false);
    setEditStudentId(null);
    setNewStudent({ name: '', email: '', dateOfJoining: '', enrollmentNumber: '', phoneNumber: '', profilePicture: '' });
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ResponsiveContainer>
      <Navbar userName={''} profilePictureUrl={''} />
      <Box display="flex" alignItems="center" justifyContent="space-between" mt={10}>
         <Typography variant="h4" gutterBottom>Students</Typography> 
      </Box>
      <Box display="flex" alignItems="center" justifyContent="end">
        <TextField
          label="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          size="small"
          margin="normal"
          style={{ width: '250px', marginRight: '10px' }}
        />
        <Button
          variant="contained"
          style={{background:'#11d268'}}
          size="large"
          onClick={handleOpenFormDialog}
        >
          {isMobile ? 'ADD' : 'Add New Student'}
        </Button>
      </Box>
      <ResponsiveTableContainer as={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>NAME</TableCell>
              <TableCell>EMAIL</TableCell>
              {!isMobile &&  (
                <>
                  <TableCell>PHONE</TableCell>
                  <TableCell>ENROLL NUMBER</TableCell>
                  <TableCell>DATE OF ADMISSION</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Grid container alignItems="center">
                    <Avatar alt={student.name} src={student.profilePicture} style={{ marginRight: '10px' }} />
                    <Typography>{student.name}</Typography>
                  </Grid>
                </TableCell>
                <TableCell>{student.email}</TableCell>
                {!isMobile && (
                  <>
                    <TableCell>{student.dateOfJoining}</TableCell>
                    <TableCell>{student.enrollmentNumber}</TableCell>
                    <TableCell>{student.phoneNumber}</TableCell>
                  </>
                )}
                <TableCell>
                  <IconButton onClick={() => editStudent(student.id)} aria-label="edit">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(student.id)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ResponsiveTableContainer>

      <Dialog
        open={openFormDialog}
        onClose={handleCloseFormDialog}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
          {editStudentId ? 'Edit Student' : 'Add New Student'}
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Name"
                value={newStudent.name}
                onChange={(e) => handleInputChange(e, 'name')}
                fullWidth
                size="small"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Email"
                type="email"
                value={newStudent.email}
                onChange={(e) => handleInputChange(e, 'email')}
                fullWidth
                size="small"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Date of Joining"
                value={newStudent.dateOfJoining}
                onChange={(e) => handleInputChange(e, 'dateOfJoining')}
                fullWidth
                size="small"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Enrollment Number"
                value={newStudent.enrollmentNumber}
                onChange={(e) => handleInputChange(e, 'enrollmentNumber')}
                fullWidth
                size="small"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Phone Number"
                value={newStudent.phoneNumber}
                onChange={(e) => handleInputChange(e, 'phoneNumber')}
                fullWidth
                size="small"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Profile Picture URL"
                value={newStudent.profilePicture}
                onChange={(e) => handleInputChange(e, 'profilePicture')}
                fullWidth
                size="small"
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
  <Grid container direction='column' justifyContent="center" alignItems='center' gap={2}>
    <Grid item>
    <Button
  variant="contained"
  style={{ background: '#11d268', width: '220px' }}
  onClick={() => (editStudentId ? updateStudent(editStudentId) : addStudent())}
>
  {editStudentId ? 'Update' : 'Submit'}
</Button>
    </Grid>
    <Grid item>
      <Button
        variant="contained"
        style={{ background: '#e85f10', width:'220px'}}
        onClick={handleCloseFormDialog}
      >
        Cancel
      </Button>
    </Grid>
  </Grid>
</DialogActions>



      </Dialog>

      <Dialog
        open={openDialog}
        onClose={cancelDelete}
      >
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this student?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyContent="center" width="100%" gap={1}>
          <Button onClick={confirmDelete} style={{ background: '#11d268',color:'white',width:'150px'}} autoFocus>
              Yes
            </Button>
            <Button onClick={cancelDelete}style={{ background: '#e85f10',color:'white',width:'150px'}} >
              No
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </ResponsiveContainer>
  );
};

export default App;
