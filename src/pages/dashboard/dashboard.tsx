import { useRefundOrders } from "../../context/RefundOrdersContext";
import RefundOrdersTable from "../../components/RefundOrdersTable";
const Dashboard = () => {
    const { state, isFetching, goToNextPage, goToPrevPage, toggleOrderStatus, updateOrderDecision } = useRefundOrders();
    console.log(state, isFetching)

    return (
        <div>
            {isFetching ? "Loading" : state.error ? "error" : (
                <RefundOrdersTable
                    orders={state.data}
                    page={state.page}
                    pages={state.pages}
                    goToNextPage={goToNextPage}
                    goToPrevPage={goToPrevPage}
                    toggleOrderStatus={toggleOrderStatus}
                    updateOrderDecision={updateOrderDecision}
                />
            )}
        </div>
    );
};

export default Dashboard;
