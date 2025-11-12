import { get, set } from 'idb-keyval';
import { indexedDbStore } from '../../indexedDbStore';

const Store_Key = 'vendor';

export const saveSelectedVendorId = async (vendor_id: number) => {
  const vendorData = (await get(Store_Key, indexedDbStore)) || {};
  vendorData.selectedVendorId = vendor_id;
  await set(Store_Key, vendorData, indexedDbStore);
};

export const getSelectedVendorId = async (): Promise<number | null> => {
  const vendorData = await get(Store_Key, indexedDbStore);
  return vendorData?.selectedVendorId || null;
};
