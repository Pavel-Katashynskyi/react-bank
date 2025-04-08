import React, { useEffect, useState } from "react";
import Page from "../../component/page";
import BackButton from "../../component/back-button";
import "./index.css";
import { useParams } from "react-router-dom";
import Break from "../../component/break";
import { formatAmount } from "../../component/format-amount";
import { useAuth } from "../../utils/AuthContext";
import Box from "../../component/box";

const TransactionPage = () => {
  const { id } = useParams();
  const auth = useAuth();
  const { userData } = auth || {};
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch(
        `http://localhost:3000/balance/?email=${userData?.email}`
      );
      const data = await res.json();

      if (res.ok) {
        setTransactions(data.transactions);
      }
    };

    fetchTransactions();
  }, [userData]);

  useEffect(() => {
    const selectedTransaction = transactions.find(
      (txn) => txn.id === parseInt(id)
    );
    setTransaction(selectedTransaction);
  }, [transactions, id]);

  return (
    <Page style={{ backgroundColor: "#F5F5F7" }}>
      <BackButton />
      <div className="settings__title">
        <h2>Transaction</h2>
      </div>
      {transaction ? (
        <>
          <div className="transaction-amount">
            {transaction.amount > 0 ? (
              <>
                {formatAmount(
                  transaction.amount,
                  "transaction__amount--green transaction__big"
                )}
              </>
            ) : (
              <>
                {formatAmount(
                  transaction.amount,
                  "transaction__amount transaction__big"
                )}
              </>
            )}
          </div>

          <div className="settings__form ">
            <Box>
              <div className="transaction__block">
                <div>Date</div>
                <div>
                  {new Date(transaction.time).toDateString().slice(4, 10)},{" "}
                  {new Date(transaction.time).toTimeString().slice(0, 5)}
                </div>
              </div>
              <Break></Break>
              <div className="transaction__block">
                <div>Address</div>
                <div>{transaction.paymentSystem || transaction.recipient}</div>
              </div>
              <Break></Break>
              <div className="transaction__block">
                <div>Type</div>
                <div>{transaction.type}</div>
              </div>
            </Box>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Page>
  );
};

export default TransactionPage;
