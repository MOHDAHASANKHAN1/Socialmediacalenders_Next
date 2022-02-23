import { Remove_To_Cart, Addqts, Removeqts } from "../Redux/Action/Cart";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";

function Cart_Cmp() {

    const dispatch = useDispatch();
    const Router = useRouter();

    const data = useSelector((state) => state.Cart.Products);
    const Totalprice = useSelector((state) => state.Cart.Totalprice);

    const [value, setValue] = useState();
    const refresh = () => {
        // re-renders the component
        setValue({});
    }

    function Remove(cdata) {
        dispatch(Remove_To_Cart(cdata))
        refresh();
    }

    function Addqt(cdata) {
        dispatch(Addqts(cdata));
        refresh();
    }

    function Removeqt(cdata) {
        dispatch(Removeqts(cdata))
        refresh();
    }


    var Cart;
    Cart = data.map((data) =>
        <>
            <div className="card rounded-3 mb-4" key={1}>
                <div className="card-body p-4">
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-2">
                            <img src={data.url}
                                className="img-fluid rounded-3" alt="Cotton T-shirt" />
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3">
                            <p className="lead fw-normal mb-2">{data.tittle}</p>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <button className="btn btn-link px-2" onClick={() => Removeqt({ quantity: 1, id: data.id })}>
                                <i className="fas fa-minus"></i>
                            </button>

                            <input id="form1" min="0" name="quantity" value={data.quantity} type="number"
                                className={`form-control form-control-sm`} />

                            <button className={`btn btn-link px-2`} onClick={() => Addqt({ quantity: 1, id: data.id })} >
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h5 className="mb-0">{`$${data.uprice}`}</h5>
                        </div>

                        <div className="col-md-1 col-lg-1 col-xl-1 text-center">
                            <a href="#!" className="text-dark" onClick={() => Router.push(`/Product/${data.productpath}`)}><i className="fa fa-eye fa-lg"></i></a>
                        </div>

                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                            <a href="#!" className="text-danger" data-bs-toggle="modal" data-bs-target="#Remove"><i className="fas fa-trash fa-lg"></i></a>
                        </div>

                        <div className="modal fade" id="Remove" tabIndex="-1" aria-labelledby="RemoveLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title text-dark" id="RemoveLabel"><b>Remove Product</b></h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <p className="text-muted"><b>You want to remove the selected product from your cart ?</b></p>
                                    </div>
                                    <hr className="bg-dark" />
                                    <div className="row g-0">
                                        <div className="col-sm-6 col-6 d-flex align-items-center justify-content-start px-4 pb-4">
                                            <button type="button" className="btn btn-secondary text-dark" data-bs-dismiss="modal"><b>Cancel</b></button>
                                        </div>
                                        <div className=" col-sm-6 col-6 d-flex align-items-center justify-content-end px-4 pb-4">
                                            <button type="submit" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => Remove({ id: data.id })}><b>Remove</b></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )

    return (
        <>
            {
                data.length !== 0 ?
                    <section className="h-100" style={{ backgroundColor: " #ccff33" }}>
                        <div className="container-fluid h-100 py-5">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-10">

                                    <div className="d-flex justify-content-between align-items-center mb-4 px-3">
                                        <h3 className="fw-normal mb-0 text-black ">Shopping Cart</h3>
                                        <div>
                                            <p className="mb-0"><span className="text-muted">Sort by:</span> <a href="#!" className="text-body">price <i
                                                className="fas fa-angle-down mt-1"></i></a></p>
                                        </div>
                                    </div>

                                    {Cart}

                                    <div className="card mb-4">
                                        <div className="card-body p-4 d-flex flex-row">
                                            <div className="form-outline flex-fill">
                                                <input placeholder="Discound code" type="text" id="form1" className="form-control form-control-lg" />
                                            </div>
                                            <button type="button" className="btn btn-outline-warning btn-lg ms-3">Apply</button>
                                        </div>
                                    </div>



                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row g-0">
                                                <div className="col-sm-6 col-6 d-flex align-items-center justify-content-start">
                                                    <button type="button" className="btn btn-warning btn-block btn-lg"><b>Proceed to Pay</b></button>
                                                </div>
                                                <div className=" col-sm-6 col-6 d-flex align-items-center justify-content-end">
                                                    <span className="mb-0 h5 text-info">{`Total $${Totalprice}`}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                    :

                    <>
                        <div className="container-fluid mt-100">
                            <div className="row">
                                <div className="col-md-12 p-4">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="fw-normal mb-0 text-black ">Shopping Cart</h3>
                                        </div>
                                        <div className="card-body cart p-4">
                                            <div className="col-sm-12 empty-cart-cls text-center"> <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" className="img-fluid mb-4 mr-3" />
                                                <h3><strong><b>Your Cart is Empty</b></strong></h3>
                                                <h4>Add something to make me happy :)</h4> <a href="#" className="btn btn-primary cart-btn-transform m-3 p-3" data-abc="true" onClick={() => Router.push("/Products/All")}><b>CONTINUE SHOPPING <span><i className='fas fa-long-arrow-alt-right px-2'></i></span></b></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    );
}

export default Cart_Cmp;