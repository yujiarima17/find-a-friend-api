import { $Enums } from "@prisma/client";
import { z } from "zod";

export const PetAgeEnum = z.nativeEnum($Enums.PetAge);
export const PetSizeEnum = z.nativeEnum($Enums.PetSize);
export const PetEnergyEnum = z.nativeEnum($Enums.EnergyLevel);
export const PetDependencyLevelEnum = z.nativeEnum($Enums.DependencyLevel);
export const PetEnvironmentEnum = z.nativeEnum($Enums.Environment);
