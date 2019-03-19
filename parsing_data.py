import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import json

def parse_cor(X):
    n = X.shape[1]
    C = np.zeros((n,n), dtype=int)
    for i in range(n):
        for j in range(i+1,n):
            X1 = X[:,i]
            X2 = X[:,j]
            c1 = np.sum(X1)
            c2 = np.sum(X2)
            c3 = np.sum(X1*X2)
            cmax = np.maximum(c1,c2)
            if(cmax==0):
                C[i,j]=0
            else:
                C[i,j]=int(c3*100/cmax)
            C[j,i] = C[i,j]
    return C

#loading data
df = pd.read_csv('patient_characteristics.csv')

df.info()
#df.head()

#df = df.loc[df['Age Group']=='ADULT']
#df = df.loc[df['Age Group']=='CHILD']
#df = df.loc[df['Sex']=='FEMALE']
#df = df.loc[df['Sex']=='MALE']
#df = df.loc[df['Hispanic Ethnicity']=='YES']
#df = df.loc[df['Hispanic Ethnicity']!='YES']
#df = df.loc[df['Race']=='WHITE ONLY']
#df = df.loc[df['Race']=='BLACK ONLY']
#df = df.loc[df['Race']=='BLACK ONLY']
#df = df.loc[df['Race']=='MULTI-RACIAL']
#df = df.loc[df['Race']=='OTHER']
#df = df.loc[df['Education Status']=='COLLEGE OR GRADUATE DEGREE']
#df = df.loc[df['Education Status']=='MIDDLE SCHOOL TO HIGH SCHOOL']
#df = df.loc[df['Education Status']=='PRE-K TO FIFTH GRADE']
df = df.loc[df['Education Status']=='OTHER']

ndf = df[['High Blood Pressure','Diabetes','Obesity','Heart Attack','Stroke',
'Pulmonary Asthma','Kidney Disease','Liver Disease','Cancer','Alcohol Related Disorder','Drug Substance Disorder']]
X = 1*(ndf.values == 'YES')
#print(X)

y = df.iloc[:,-1].values
print(y)
Y_MI = np.reshape(1*(y=='MENTAL ILLNESS'), (-1,1))
Y_DD = np.reshape(1*(y=='DEVELOPMENTAL DISORDERS'), (-1,1))
Y_OD = np.reshape(1*(y=='ORGANIC DISORDER'), (-1,1))
#Y_OT = np.reshape((y=='NOT MI - OTHER'), (-1,1))
Y_AD = np.reshape(1*(y=='SUBSTANCE-RELATED AND ADDICTIVE DISORDERS'), (-1,1))

unique, counts = np.unique(Y_AD, return_counts=True)
print(dict(zip(unique, counts)))

print(X.shape)
X = np.append(X, Y_AD, axis=1)
#X = np.append(X, Y_OD, axis=1)
X = np.append(X, Y_MI, axis=1)
print(X)

cor = parse_cor(X)
with open('data.json', 'w') as outfile:
    json.dump(cor.tolist(), outfile)


header_names = ['High Blood Pressure','Diabetes','Obesity','Heart Attack','Stroke', 'Pulmonary Asthma','Kidney Disease',
           'Liver Disease','Cancer','Alcohol Related Disorder','Drug Substance Disorder', 'Addictive Disorder', 'Mental Illness' ]


dff = pd.DataFrame(cor, columns = header_names, index=header_names)
f = plt.figure(figsize=(15,12))
sns.heatmap(dff,annot=True,cmap='viridis')
plt.show()
