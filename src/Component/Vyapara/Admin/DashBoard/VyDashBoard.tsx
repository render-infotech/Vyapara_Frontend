import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import { Dashboard, ProjectDashboard } from "../../../../utils/Constant";
import { Container, Row } from "reactstrap";
import TotalUsers from "./TotalUsers/TotalUsers";
import TotalRevenue from "./TotalRevenue/TotalRevenue";
import ActiveVendors from "./ActiveVendors/ActiveVendors";
import RecentDeliveryRequests from "./RecentDeliveryRequests/RecentDeliveryRequests";
import PendingDeliveries from "./PendingDeliveries/PendingDeliveries";
import { useAppSelector } from "../../../../ReduxToolkit/Hooks";
import Loader from "../../Loader/Loader";

const VyDashBoard = () => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate dashboard loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds loader

    return () => clearTimeout(timer);
  }, []);

  if (!currentUser) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <>
      {loading && <Loader />}
      <>
        <Breadcrumbs mainTitle={ProjectDashboard} parent={Dashboard} />
        <Container fluid className="basicinit-page project-dashboard">
          <Row>
            <TotalUsers />
            <TotalRevenue />
            <ActiveVendors />
            <PendingDeliveries />
          </Row>
          <Row>
            <RecentDeliveryRequests />
          </Row>
        </Container>
      </>
    </>
  );
};

export default VyDashBoard;
