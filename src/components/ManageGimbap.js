import { dbService, storageService } from 'fbase';
import { Form, Button } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import PropTypes from 'prop-types';
import 'components/ManageGimbap.css';

function ManageGimbap({ gimbap }) {
  const onSubmit = async (event) => {
    event.preventDefault();
    const ok = window.confirm("Are you sure you want to delete this?");
    if (ok) {
      await dbService.doc(`gimbaps/${gimbap.id}`).delete();
      await storageService.refFromURL(gimbap.imageUrl).delete();
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <div>
          <strong>{gimbap.gimbapName}</strong> &nbsp;
          <CurrencyFormat value={gimbap.price} displayType="text"
            decimalScale={2} prefix="$ " thousandSeparator />
          <Button type="submit" className="ms-3">Delete</Button>
        </div>
        <div className="manage-gimbap-image-wrapper position-relative my-3">
          <img src={gimbap.imageUrl} alt="gimbap" className="manage-gimbap-image" />
        </div>
        <p>{gimbap.ingredients}</p>
      </Form.Group>
    </Form>
  );
}

ManageGimbap.propTypes = {
  gimbap: PropTypes.object
};

export default ManageGimbap;
