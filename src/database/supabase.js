import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchWalletAddress = async () => {
  const { data, error } = await supabase
    .from("LinkAddress")
    .select("walletaddress")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Error fetching wallet address:", error);
    return null;
  }

  return data?.walletaddress;
};

export const fetchAllNFT = async () => {
  const { data, error } = await supabase.from("NFTList").select("*");
  if (error) {
    console.error("Error Fetching NFT list:", error);
    return [];
  }
  return data;
};

export const fetchAmount = async () => {
  const { data, error } = await supabase
    .from("Mosuyop")
    .select("amount")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("error fetching sa amount:", error);
    return [];
  }

  return data;
};

// Fetch the percentage and transaction count for a specific address
export const fetchPercentageAndTransactionForAddress = async (address) => {
  const { data, error } = await supabase
    .from("Percentage")
    .select("percent, transaction")
    .eq("address", address)
    .single();

  if (error && !data) {
    console.error("Error fetching percentage and transaction:", error);
    return null;
  }

  return data;
};

// Insert a new address entry with percentage and transaction count
export const insertPercentageAndTransactionForAddress = async (
  address,
  percent,
  transaction
) => {
  const { data, error } = await supabase
    .from("Percentage")
    .insert([{ address, percent, transaction }]);

  return data;
};

// Update the percentage and transaction count for an existing address
export const updatePercentageAndTransactionForAddress = async (
  address,
  percent,
  transaction
) => {
  const { data, error } = await supabase
    .from("Percentage")
    .update({ percent, transaction })
    .eq("address", address);

  return data;
};

// Insert a new NFT into the NFTList table
export const insertNFT = async (nft) => {
  const { data, error } = await supabase.from("NFTList").insert([nft]);

  return data;
};

// Remove an NFT from the NFTList table
export const removeNFT = async (id) => {
  const { data, error } = await supabase.from("NFTList").delete().eq("id", id);

  return data;
};

// Update the wallet address in the LinkAddress table
export const updateWalletAddress = async (walletAddress) => {
  const { data, error } = await supabase
    .from("LinkAddress")
    .update({ walletaddress: walletAddress })
    .eq("id", 1);

  return data;
};

// Update the amount in the Mosuyop table
export const updateAmount = async (amount) => {
  const { data, error } = await supabase
    .from("Mosuyop")
    .update({ amount })
    .eq("id", 1);

  return data;
};
