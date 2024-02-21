import { FunctionComponent, useContext, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../components/title';
import VeiculosContext from '../../context/veiculos';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Modal, Box, TextField, Button } from '@mui/material';

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

const Veiculos: FunctionComponent = () => {
  const { list, isLoading, fetchList } = useContext(VeiculosContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const marca = data.get('marca') as string;
    const modelo = data.get('modelo') as string;
    const placa = data.get('placa') as string;
    const apartamento_proprietario = data.get(
      'apartamento_proprietario'
    ) as string;

    if (marca !== null && modelo !== null && placa !== null) {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        marca,
        modelo,
        placa,
        apartamento_proprietario
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
      };

      fetch('http://localhost:8080/api/veiculos', requestOptions)
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
              <Title>Veiculos</Title>
            </Grid>
            <Grid item xs={2}>
              <Button onClick={handleOpen}>Adicionar veiculo</Button>
            </Grid>
          </Grid>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Proprietário</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Placa</TableCell>
              </TableRow>
            </TableHead>
            {!isLoading && (
              <TableBody>
                {list.map((row) => {
                  const { id_veiculo, proprietario, marca, modelo, placa } =
                    row;

                  return (
                    <TableRow key={id_veiculo}>
                      <TableCell>
                        {proprietario === null
                          ? ''
                          : `${proprietario.primeiro_nome} ${proprietario.segundo_nome}`}
                      </TableCell>
                      <TableCell>{marca}</TableCell>
                      <TableCell>{modelo}</TableCell>
                      <TableCell>{placa}</TableCell>
                    </TableRow>
                  );
                })}
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
            id="marca"
            label="Marca"
            name="marca"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="modelo"
            label="Modelo"
            name="modelo"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="placa"
            label="Placa"
            type="placa"
            id="placa"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="apartamento_proprietario"
            label="Apartamento Proprietario"
            type="apartamento_proprietario"
            id="apartamento_proprietario"
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

export default Veiculos;
