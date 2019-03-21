import pandas as pd
import numpy as np
import json
import csv
import matplotlib.pyplot as plt

#Read in original data file.
raw_data = pd.read_csv("Patient_Characteristics_Survey_PCS_2015.csv")

print("\nNumber of instances and columns before preprocessing data: "+str(raw_data.shape)+"\n")

#Replace "UNKNOWN" values with NaN.
raw_data = raw_data.replace("UNKNOWN", np.nan)

#Randomize data
raw_data.reindex(np.random.permutation(raw_data.index))

#Drop all rows that have NaN values in at least one cell.
raw_data = raw_data.dropna()

#Group values by attributes
racial_groups = raw_data.groupby('Race')

#Condense data to only include the following attributes:
raw_data = raw_data[['Mental Illness','Alcohol Related Disorder','Drug Substance Disorder',
					'High Blood Pressure','Diabetes','Obesity','Heart Attack','Stroke',
					'Pulmonary Asthma','Kidney Disease','Liver Disease','Cancer']]

#Replace categorical cells with 1s and 0s.
raw_data = raw_data.replace("NO", 0.0)
raw_data = raw_data.replace("YES", 1.0)

print("\nNumber of instances and columns after processing: "+str(raw_data.shape)+"\n")

#Get resulting correlation matrix:
corr_matrix = raw_data.corr()
result = raw_data.corr()
print("\nCorrelation Matrix has now been generated.\n")

#Transfer correlation matrix to new CSV
corr_matrix.to_csv('correlation_matrix.csv', index=False)
result.to_csv('correlation_matrix.csv', index=False)

#Re-label x and y axis before creating heat map
labels = ('Mental Illness','Alcohol Related Disorder','Drug Substance Disorder',
			'High Blood Pressure','Diabetes','Obesity','Heart Attack','Stroke',
			'Pulmonary Asthma','Kidney Disease','Liver Disease','Cancer')

label_position = np.arange(len(labels))		

plt.yticks(label_position, labels)
plt.xticks(label_position, labels)
plt.xticks(rotation=90)

#Plot correlation matrix as heat map
plt.imshow(corr_matrix, cmap='hot', interpolation='nearest')
plt.show()

#Transfer data to new CSV
raw_data.to_csv('parsed_data.csv', index=False)