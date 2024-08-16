import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './navbar.css'

const Webpage = () => {
    const [data, setData] = useState([])
    const [catData, setCatData] = useState([])
    const [search, setSearch] = useState("")
    const fetchData = () => {
        axios.get('https://fakestoreapi.com/products')
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        fetchData()

        axios.get('https://fakestoreapi.com/products/categories')
            .then((res) => {
                setCatData(res.data)
            })
            .catch((err) => console.log(err))
    }, [])
    const searchTitle = (e) => {
        setSearch(e.target.value)
        console.log(search);
        if (search != '') {
            let data1 = data.filter((i) => {
                if (i.title.includes(search)) {
                    return i;
                }
            })
            console.log(data1);
            setData(data1)
        } else {
            fetchData()
        }
    }
    const getCategory = (e) => {
        console.log(e.target.value);
        let cat = e.target.value
        if (cat !== '') {
            axios.get('https://fakestoreapi.com/products/category/' + cat)
                .then((res) => {
                    setData(res.data)
                })
        }
        else {
            fetchData();
        }
    }
    const ShowAll = (e) => {
        fetchData(e)
    }
    const Electronics = (e) => {
        axios.get('https://fakestoreapi.com/products/category/electronics')
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.log(err))
    }
    const Jewelery = (e) => {
        axios.get('https://fakestoreapi.com/products/category/jewelery')
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.log(err))
    }
    const MenClothing = (e) => {
        axios.get("https://fakestoreapi.com/products/category/men's clothing")
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.log(err))
    }
    const WomenClothing = (e) => {
        axios.get("https://fakestoreapi.com/products/category/women's clothing")
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.log(err))
    }
    const getPriceOrder = (e) => {
        let order = e.target.value
        let sortedData = [...data];
        if (order == 1) {
            sortedData.sort((a, b) => {
                return a.price - b.price
            })

        } else if (order == 2) {
            sortedData.sort((a, b) => {
                return b.price - a.price
            })

        } else {
            fetchData()
        }
        setData(sortedData)
    }
    return (
        <div>
            <div className="navbar">
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="#home"><img src="../image/nest.png" alt="" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        </Navbar.Collapse>
                        <NavDropdown title="Select-Language" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Gujrati</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">English</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Hindi</NavDropdown.Item>
                        </NavDropdown>
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Search</Nav.Link>
                            <Nav.Link href="#link">Cart</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
            <div className='main-img'>
                <Container className='backimg'>
                    <img src="../image/main-img.jpg" alt="" />
                </Container>
            </div>
            <br /><br />
            <div className="text-menu">
                <Container>
                    <h1>Nest Mart & Grocery</h1>
                    <h3>Everyday Fresh & Clean with Our Products</h3>
                </Container>
            </div>
            <br /> <br />
            <div className="card-menu">
                <Container>
                    <div className='cards-wi'>
                        <Card className="bg-dark text-white">
                            <Card.Img src="../image/img-1.png" alt="Card image" />
                            <Card.ImgOverlay>
                                <Card.Text className='text-color'>
                                    Everyday Fresh & Clean with Our Products
                                </Card.Text>
                                <Button variant="success">SHOP NOW</Button>{' '}
                            </Card.ImgOverlay>
                        </Card>
                    </div>
                    <div className='cards-wi'>
                        <Card className="bg-dark text-white">
                            <Card.Img src="../image/img-2.png" alt="Card image" />
                            <Card.ImgOverlay>

                                <Card.Text className='text-color'>
                                    Make your Breakfast Healthy and Easy
                                </Card.Text>
                                <Button variant="success">SHOP NOW</Button>{' '}
                            </Card.ImgOverlay>
                        </Card>
                    </div>
                    <div className='cards-wi'>
                        <Card className="bg-dark text-white">
                            <Card.Img src="../image/img-3.png" alt="Card image" />
                            <Card.ImgOverlay>

                                <Card.Text className='text-color'>
                                    The best Organic Products Online
                                </Card.Text>
                                <Button variant="success">SHOP NOW</Button>{' '}
                            </Card.ImgOverlay>
                        </Card>
                    </div>
                </Container>
            </div>
            <br /><br />
            <div className="button-click">
                <Container>
                    <div className='button-wi'>
                        <Button variant="primary" onClick={ShowAll}>Show All</Button>{' '}
                        <Button variant="secondary" onClick={Electronics}>electronics</Button>{' '}
                        <Button variant="secondary" onClick={Jewelery}>jewelery</Button>{' '}
                        <Button variant="secondary" onClick={MenClothing}>men's clothing</Button>{' '}
                        <Button variant="secondary" onClick={WomenClothing}>women's clothing</Button>{' '}

                        <select name="category" onChange={getCategory}>
                            <option value=''>--Select Category--</option>
                            {
                                catData && catData.map((i) => {
                                    return (<option value={i}>{i}</option>)
                                })
                            }
                        </select>

                        <input type="search" name="search" placeholder='Search by Title' className='abc' onKeyUp={searchTitle} />

                        <select name="priceorder" onChange={getPriceOrder}>
                            <option value="">--Select order--</option>
                            <option value="1">Asc</option>
                            <option value="2">desc</option>
                        </select>

                    </div>
                </Container>
            </div>
            <br /><br />
            <div className="product-card">
                <Container>
                    <h2>Popular Products</h2><br />
                    {
                        data && data.map((i) => {
                            return (
                                <div className='product-cards'>
                                    <Card style={{ width: '20rem', height: '380px', margin: '10px 2px' }}>
                                        <Card.Body>
                                            <Card.Img variant="top" src={i.image} style={{ height: '190px' }} />

                                            <Card.Title>{i.title}</Card.Title>
                                            <Card.Text>
                                                Category: {i.category}
                                            </Card.Text>
                                            <Card.Text>
                                                Price: {i.price}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })
                    }
                </Container>
            </div>
        </div>
    )
}

export default Webpage

