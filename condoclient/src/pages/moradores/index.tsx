import { FunctionComponent, useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Title from '../../components/title';
import MoradoresContext from '../../context/moradores';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const Moradores: FunctionComponent = () => {
  const { list, isLoading, fetchList } = useContext(MoradoresContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const primeiro_nome = data.get('primeiro_nome') as string;
    const segundo_nome = data.get('segundo_nome') as string;
    const apartamento = data.get('apartamento') as string;

    if (
      primeiro_nome !== null &&
      segundo_nome !== null &&
      apartamento !== null
    ) {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        primeiro_nome,
        segundo_nome,
        apartamento
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
      };

      await fetch('http://localhost:8080/api/moradores', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          fetchList();
          handleClose();
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Title>Moradores</Title>
            </Grid>
            <Grid item xs={2}>
              <Button onClick={handleOpen}>Adicionar morador</Button>
            </Grid>
          </Grid>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Apartamento</TableCell>
              </TableRow>
            </TableHead>
            {!isLoading && (
              <TableBody>
                {list.map((row) => (
                  <TableRow key={row.id_morador}>
                    <TableCell>
                      {row.primeiro_nome} {row.segundo_nome}
                    </TableCell>
                    <TableCell>{row.apartamento}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </Paper>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ ...style, mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="primeiro_nome"
            label="Primeiro nome"
            name="primeiro_nome"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="segundo_nome"
            label="Segundo nome"
            name="segundo_nome"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="apartamento"
            label="Apartamento"
            type="apartamento"
            id="apartamento"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="error"
                onClick={handleClose}
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="success"
              >
                Criar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default Moradores;
