import { memo } from 'react';
import useRefundOrders from "../../hooks/useRefundOrders";
import RefundOrdersTable from "../../components/refund_orders_table";
import ErrorMessage from '../../components/error_message';

const Dashboard: React.FC = () => {
    const { state, isFetching, goToNextPage, goToPrevPage } = useRefundOrders();
    return (
        <div>
            {isFetching ? "Loading" : state.error ? <ErrorMessage errMessage={state.error} /> : (
                <RefundOrdersTable
                    orders={state.data}
                    page={state.page}
                    pages={state.pages}
                    goToNextPage={goToNextPage}
                    goToPrevPage={goToPrevPage}
                />
            )}
        </div>
    );
};

export default memo(Dashboard);