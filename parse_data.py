#Program to remove any rows that have 'Unknown' values.

import pandas as pd
import numpy as np

raw_data = pd.read_csv("Patient_Characteristics_Survey_PCS_2015.csv")

print("Number of instances and columns before preprocessing data:")
print(raw_data.shape)

#Replace "UNKNOWN" values with NaN
raw_data = raw_data.replace("UNKNOWN", np.nan)

#Drop all rows that have NaN values in at least one cell
raw_data = raw_data.dropna()

#Condense data to only include the following attributes
raw_data = raw_data[['Mental Illness','Alcohol Related Disorder','Drug Substance Disorder',
					'High Blood Pressure','Diabetes','Obesity','Heart Attack','Stroke',
					'Pulmonary Asthma','Kidney Disease','Liver Disease','Cancer']]

#print("Number of instances and columns after processing:")
print(raw_data.shape)

#Transfer data to new CSV
raw_data.to_csv('parsed_data.csv', index=False)