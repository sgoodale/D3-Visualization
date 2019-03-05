#Program to remove any rows that have 'Unknown' values.

import pandas as pd
import numpy as np

patients = pd.read_csv("Patient_Characteristics_Survey_PCS_2015.csv")

print("Number of instances and columns before preprocessing data:")
print(patients.shape)

#Replace "UNKNOWN" values with NaN
patients = patients.replace("UNKNOWN", np.nan)

#Drop all rows that have NaN values in at least one cell
patients = patients.dropna()

print("Number of instances and columns after processing:")
print(patients.shape)

#Transfer data to new CSV
patients.to_csv('Patient_Characteristics_Nulls_Dropped.csv', index=False)