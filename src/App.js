import React, { useState, useRef, useEffect } from 'react';
import styles from './app.module.scss';

function App() {
  const [isOpen, setOpen] = useState(false);
  const [product, setProduct] = useState('');
  const [weight, setWeight] = useState('');
  const [serachTerm, setSearchTerm] = useState('');
  const [allProds, setAllProds] = useState([]);

  const [clientErr, setClientErr] = useState({
    weight: '',
    product: '',
  });

  const inputRef = useRef(null);

  useEffect(() => {
    console.log(inputRef.current.value, 'hhhh');
    inputRef.current.selectionEnd = inputRef.current.value.length - 1;
  }, [weight]);

  const doAddItem = () => {
    let errorsCopy = { ...clientErr };
    let isError = false;
    if (!product) {
      isError = true;
      errorsCopy.product = 'Product is Required';
    }
    if (!weight) {
      isError = true;
      errorsCopy.weight = 'Weight is Required';
    }
    if (isError) {
      setClientErr({ ...errorsCopy });
    } else {
      let item = { product, weight };
      setAllProds([item, ...allProds]);
      setProduct('');
      setWeight('');
      setOpen(false);
    }
  };

  return (
    <div className={styles.app_container}>
      <div className={styles.search_container}>
        <input
          value={serachTerm}
          onChange={e => setSearchTerm(e.target.value)}
          type='search'
          placeholder='Search Here'
        />
        <button onClick={() => setOpen(true)}>+</button>
      </div>
      <div className={styles.prod_list_container}>
        {allProds
          .filter(item => item.product.includes(serachTerm))
          .map(item => {
            return (
              <div className={styles.prod_item}>
                <p>{item.product}</p>
                <p>{item.weight}</p>
              </div>
            );
          })}
      </div>
      <div
        style={{ display: isOpen ? 'block' : 'none' }}
        className={styles.modal}
      >
        <div className={styles.modal_content}>
          <span onClick={() => setOpen(false)} className={styles.close}>
            &times;
          </span>
          <div className={styles.form_container}>
            <div className={styles.text_input}>
              <label>Product</label>
              <input
                value={product}
                onChange={e => setProduct(e.target.value)}
                type='text'
                name='product'
                placeholder='Product Name'
              />
              <small style={{ color: 'red' }}>{clientErr.product}</small>
            </div>
            <div className={styles.text_input}>
              <label>Weight</label>
              <input
                onFocus={e =>
                  e.currentTarget.setSelectionRange(
                    e.currentTarget.value.length,
                    e.currentTarget.value.length - 1
                  )
                }
                ref={inputRef}
                value={weight}
                onChange={e => {
                  let suffix = e.target.value
                    .replace(/[^0-9.]/g, '')
                    .replace(/(\..*?)\..*/g, '$1');
                  if (suffix) {
                    setWeight(suffix + 't');
                  } else {
                    setWeight(suffix);
                  }
                }}
                type='text'
                name='weight'
                placeholder='Product Weight'
              />
              <small style={{ color: 'red' }}>{clientErr.weight}</small>
            </div>
            <div className={styles.btn_container}>
              <button onClick={doAddItem}>ADD</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
