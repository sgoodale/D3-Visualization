import pandas as pd
import numpy as np

#Read in original data file.
raw_data = pd.read_csv("Patient_Characteristics_Survey_PCS_2015.csv")

print("Number of instances and columns before preprocessing data:")
print(raw_data.shape)

#Replace "UNKNOWN" values with NaN.
raw_data = raw_data.replace("UNKNOWN", np.nan)

#Only consider Mental Illness = YES --> Replace all instances of Mental Illness = NO so they can be dropped from the data.
raw_data['Mental Illness'] = raw_data['Mental Illness'].replace("NO", np.nan)

#Drop all rows that have NaN values in at least one cell.
raw_data = raw_data.dropna()

#Condense data to only include the following attributes:
raw_data = raw_data[['Mental Illness','Alcohol Related Disorder','Drug Substance Disorder',
					'High Blood Pressure','Diabetes','Obesity','Heart Attack','Stroke',
					'Pulmonary Asthma','Kidney Disease','Liver Disease','Cancer']]

#Transfer data to new CSV
raw_data.to_csv('parsed_data.csv', index=False)

#Condense data to only include the following attributes with the assumption that we only consider Mental Illness = YES
raw_data = raw_data[['Alcohol Related Disorder','Drug Substance Disorder',
					'High Blood Pressure','Diabetes','Obesity','Heart Attack','Stroke',
					'Pulmonary Asthma','Kidney Disease','Liver Disease','Cancer']]

#Replace categorical cells with 1s and 0s.
raw_data = raw_data.replace("NO", 0.0)
raw_data = raw_data.replace("YES", 1.0)

print("Number of instances and columns after processing:")
print(raw_data.shape)
print("\n")

#Get resulting correlation matrix:
result = raw_data.corr()
print("The resulting correlation matrix is: \n")
print(result)