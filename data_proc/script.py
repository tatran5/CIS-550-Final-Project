import pandas as pd
#df = pd.read_csv('final_has_ingr.csv', sep=',') #1605472
#df = pd.read_csv('final_recipe.csv', sep=',') #178265
#df = pd.read_csv('final_ingr_map.csv', sep=',') #8023
df = pd.read_csv('final_has_ingr.csv', sep=',') #1605472
print(len(df))
df = df.drop(columns=['Unnamed: 0'])
print(df.keys())
df = df.drop_duplicates()
df.to_csv('final_has_ingr_new.csv')
print(len(df))
'''
import numpy as np 
arr = np.load('ingr_map.pkl', allow_pickle=True)
ing_dic = arr['raw_ingr']

import csv
with open('ingr.csv', 'w') as f:
    for key in ing_dic.keys():
        f.write("%s,\'%s\',0,0\n"%(key, ing_dic[key]))
'''
'''
# name,id,minutes,nuitrition,n_steps,steps,description
proc = pd.read_csv('PP_recipes.csv', sep=',')
raw = pd.read_csv('RAW_recipes.csv', sep=',')
pd.merge(df1, df2, left_on='id', right_on='id1', how='left')
'''

'''
import pandas as pd
df = pd.read_csv('PP_recipes.csv', sep=',')
s = df['ingredient_ids']

import tqdm
for i in tqdm.tqdm(range(len(s))):
    strs = s[i][1:-1].split(',') 
    ing_str = ''
    for j in range(len(strs)):
        ing_name = ing_dic[int(strs[j])]
        if j != len(strs) - 1:
            ing_str += ing_name + ';'
        else:
            ing_str += ing_name
    s[i] = ing_str
print(s)
df.to_csv('PP_recipes_processed.csv')
'''