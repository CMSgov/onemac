import { waiverAppendixK } from "cmscommonlib";
import { buildAnyPackage } from "./buildAnyPackage";

export const buildMedicaidSpa = async (packageId) =>
  buildAnyPackage(packageId, waiverAppendixK);
