import Drawer from "../../../shared/ui/Drawer";
import Skeleton from "../../../shared/ui/Skeleton";
import OrderCustomerCard from "./OrderCustomerCard";
import OrderStoreCard from "./OrderStoreCard";
import OrderProductsList from "./OrderProductsList";
import OrderPaymentInfo from "./OrderPaymentInfo";

function DrawerLoading() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-7 w-[150px]" />
      <Skeleton className="h-[150px] w-full" />
      <Skeleton className="h-[100px] w-full" />
      <Skeleton className="h-[180px] w-full" />
      <Skeleton className="h-[140px] w-full" />
    </div>
  );
}

function DrawerErrorState({ message }) {
  return (
    <div className="rounded-[24px] border border-[#E7E1DE] bg-white px-5 py-10 text-center">
      <h3 className="text-[18px] font-semibold text-[#151210]">
        Unable to load order detail
      </h3>
      <p className="mt-3 text-[15px] text-[#7B7672]">
        {message || "Failed to load order details."}
      </p>
    </div>
  );
}

export default function OrderDetailsDrawer({
  open,
  onClose,
  detail,
  loading,
  error,
  onConfirm,
}) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Order Details"
      widthClassName="sm:max-w-[430px] lg:max-w-[450px]"
      titleClassName="font-serif text-[24px] leading-none text-[#151210]"
      bodyClassName="bg-white"
    >
      {loading ? <DrawerLoading /> : null}

      {!loading && error ? <DrawerErrorState message={error} /> : null}

      {!loading && !error && detail ? (
        <>
          <OrderCustomerCard detail={detail} />
          <OrderStoreCard detail={detail} />
          <OrderProductsList items={detail.items} />
          <OrderPaymentInfo payment={detail.payment} />

          <button
            type="button"
            onClick={onConfirm}
            className="mt-1 inline-flex h-[50px] w-full items-center justify-center bg-[#E4B2B2] px-6 text-[16px] font-medium text-[#151210] transition hover:opacity-90"
          >
            Confirm
          </button>
        </>
      ) : null}
    </Drawer>
  );
}