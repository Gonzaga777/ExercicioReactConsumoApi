import React, { useState } from 'react'
import '../List/ToList.css';
import { AiFillCheckCircle } from "react-icons/ai";
import {
    Container, ListGroup, Row,
    Col, Button, Modal, Alert , Form
} from 'react-bootstrap'



function ToList(props) {

    const [show, setShow] = useState(false)
    const [showEdit, setShowEdit] = useState(false);
    const [successDelete, setSuccessDelete] = useState(false)
    const [successInsert, setSuccessInsert] = useState(false)
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [task, setTask] = useState({});
    const [customer, setCustomer] = useState({});

    const renderCustomer = () => {
        return props.user.map((item) => {
            return (
                <ListGroup.Item key={item.id}>
                <Row>
                    <Col xs={2} md={2}>
                        {item.name}
                    </Col>
                    <Col xs={2} md={2}>
                        {item.age}
                    </Col>
                    <Col xs={2} md={2}>
                        {item.document}
                    </Col>
                    <Col xs={2} md={2}>
                        {item.tel}
                    </Col>
                    <Col xs={2} md={2}>
                        {item.state}
                    </Col>
                    <Col xs={2} md={2}>
                        <Button variant="success" onClick={() => {
                                setCustomer(item)
                                handleShowEdit()
                                }}>
                            Alterar
                        </Button>
                        <Button className="mx-1" variant="danger"
                            onClick={() => {
                                setCustomer(item)
                                handleShow()
                                }}>
                            Deletar
                        </Button>
                    </Col>
                </Row>
            </ListGroup.Item>
            )
        })
        
    }
    console.log(customer)
    return (
        <Container>
           
            {
                successDelete 
                ?
                <Alert key='success' variant='success'>
                    Usuario Deletado Com Sucesso! <AiFillCheckCircle size="25" />
                </Alert>
                :
                ''
            }
            {
                successInsert
                ?
                <Alert key='success' variant='success'>
                    Usuario Alterado Com Sucesso! <AiFillCheckCircle size="25" />
                </Alert>
                :
                ''
            }
            
            <Row>
                <Col>
                <Row style={{
        backgroundColor: 'Black',
        width: '100%', 
      }}> <Col xs={2} md={2}><b>|   NOME   |</b></Col><Col xs={2} md={2}><b>|   IDADE   |</b></Col><Col xs={2} md={2}><b>|   DOCUMENTO   |</b></Col><Col xs={2} md={2}><b>|   TELEFONE   |</b></Col><Col xs={2} md={2}><b>| ESTADO |</b></Col></Row>
                <ListGroup variant="flush">
                    {renderCustomer()}
                </ListGroup>
                </Col>
            </Row>
            {/* Modal Atualizar */}
            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nome :</Form.Label>
                        <Form.Control type="text" placeholder="Digite o novo nome"
                            value={customer.name}
                            onChange={event => setCustomer({...customer, name: event.target.value})} />
                            <Form.Label>Idade :</Form.Label>
                        <Form.Control type="number" placeholder="Digite o nova Idade"
                            value={customer.age}
                            onChange={event => setCustomer({...customer, age: event.target.value})} />
                            <Form.Label>Documento :</Form.Label>
                        <Form.Control type="number" placeholder="Digite o novo documento"
                            value={customer.document}
                            onChange={event => setCustomer({...customer, document: event.target.value})} />
                            <Form.Label>Tefefone :</Form.Label>
                        <Form.Control type="number" placeholder="Digite o novo Telefone"
                            value={customer.tel}
                            onChange={event => setCustomer({...customer, tel: event.target.value})} />
                            <Form.Label>Estado :</Form.Label>
                        <Form.Control type="text" placeholder="Digite o novo Estado"
                            value={customer.state}
                            onChange={event => setCustomer({...customer, state: event.target.value})} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => {
                                props.editDescription(customer)
                                handleShowEdit()
                                handleCloseEdit()
                                setSuccessInsert(true)
                                setTimeout(() => {setSuccessInsert(false)}, 2000)
                                }}>
                        Editar
                    </Button>
                </Modal.Footer>
            </Modal>
            
            {/* Modal Deletar */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deletar cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja deletar o(a) cliente <strong>{customer.name}</strong> </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="danger" onClick={() => {
                        props.delete(customer.id)
                        handleClose()
                        setSuccessDelete(true)
                        setTimeout(() => {setSuccessDelete(false)}, 2000)
                        }} >
                        Deletar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )

}

export default ToList