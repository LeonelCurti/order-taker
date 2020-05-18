import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Layout from "../components/layout/Layout";
import { connect } from "react-redux";
import { getPriceList } from "../store/actions/orders";

const Dashboard = (props) => {
  const { getPriceList } = props;
  useEffect(() => {
    getPriceList();
  }, [getPriceList]);

  return (
    <Layout>
      dashboard
    </Layout>
  );
};

Dashboard.prototype = {
  getPriceList: PropTypes.func.isRequired,
};

export default connect(null, { getPriceList })(Dashboard);
