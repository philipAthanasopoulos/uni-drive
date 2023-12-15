#IOANNIS IATRAKIS 5116

from random import randint
try:
    players=int(input('Number of players (between 2 and 6):'))
    if players>6 or players <2 :
        print('I expected between 2 and 6 players')
        print("I'm setting the number of players to 3")
        players=3
except Exception as e:
    print('Something wrong happened:' ,e)
    print("I'm setting the number of players to 3")
    players=3

try:
    coins=int(input('Number of coins per player (between 5 and 100):'))
    if coins>100 or coins <5 :
        print("I'm setting the number of coins to 10")
        coins=10

except Exception as e:
    print('Something wrong happened:',e)
    print("I'm setting the number of coins to 10")
    coins=10


mana=randint(1,players)        
print('Game begins with' ,players, 'players.')
print('Each player has',coins ,'coins.')
print('Player',mana, 'is randomly chosen as banker')


coins_players={}
print('Current balance:')        

for i in range(1,players+1):
    coins_players[i]=coins
    print('player',i,'has',coins_players[i],'coins')
    
print()
    
while 0 not in list(coins_players.values()):  
    arxiko_pontarisma=eval(input('Player ' +str(mana)+' : You are the banker! Please enter a valid bank amount:'))
    while arxiko_pontarisma> coins_players[mana]:
        arxiko_pontarisma=eval(input('Player ' +str(mana)+': You are the banker! Please enter a valid bank amount:'))
    print()

    pontarismata={}
    for i in range(mana+1,players+1):
        if arxiko_pontarisma==0:
            break
   
        pontarisma_paiktwn=eval(input('Player '+str(i)+': Please enter a valid bet:'))
       
        while pontarisma_paiktwn>coins_players[i] or pontarisma_paiktwn > arxiko_pontarisma or  pontarisma_paiktwn<1 :
            pontarisma_paiktwn=eval(input('Player '+str(i)+': Please enter a valid bet again: '))
        pontarismata[i]=pontarisma_paiktwn  
        arxiko_pontarisma=arxiko_pontarisma-pontarisma_paiktwn
    
    if arxiko_pontarisma>0:
        for i in range(1,mana):
            if arxiko_pontarisma==0:
                break
            pontarisma_paiktwn=eval(input('Player '+str(i)+': Please enter a valid bet:'))
            
            while pontarisma_paiktwn>coins_players[i] or pontarisma_paiktwn>arxiko_pontarisma or pontarisma_paiktwn<1 :
                pontarisma_paiktwn=eval(input('Player '+str(i)+': Please enter a valid bet again:'))
            pontarismata[i]=pontarisma_paiktwn
            
                
            arxiko_pontarisma=arxiko_pontarisma-pontarisma_paiktwn
            
    
        arxiko_pontarisma=arxiko_pontarisma-pontarisma_paiktwn

    print()    
    print('Round starts:')
    for i in range(1,players+1):
        if i in pontarismata:
            print('Player '+str(i)+': has bet '+str(pontarismata[i])+':')
        elif i==mana:
            print('Player '+str(mana)+': Banker with bank amount='+str(sum(pontarismata.values()))+':')
        else:
            print('Player',i,': has bet 0:')
    print()

    print()

    points={} 
    rolls=0

    input('Banker : press ENTER to roll dice')
    while True:
                if rolls!=0:
                    print('Banker rolls again')
                x=[]
                for j in range (3):
                    y=randint(1,6)
                    x.append(y)    
                    x.sort()
                print ('Banker rolled:' ,x)
    
                if x[0]==x[1] and x[1]==x[2] :
                    points[0]=7
                    rolls=0
                    break
                elif x[0]==x[1] and x[2]==6 or x==[4,5,6]:
                    points[0]=7
                    rolls=0
                    break
                elif x[0]==1 and x[1]==x[2] or x ==[1,2,3]:
                    points[0]=0
                    rolls=0
                    break
                
                elif x[0] ==x[1] :
                    points[0]=x[2]
                    rolls=0
                    break
                elif x[1] ==x[2]:
                    points[0]=x[0]
                    rolls=0
                    break
                rolls=rolls+1



    for i in range(1,len(pontarismata)+1):
        if points[0]==7:
            print('Automatic Win! Banker wins all bets! Round ends!')
            coins_players[mana]=coins_players[mana]+ sum(pontarismata.values())
            for j in range(1,players+1):
                if j in pontarismata:
                    coins_players[j]=coins_players[j]-pontarismata[j]    
            break
        elif points[0]==0:
            print('Automatic Lose! All Players win the Banker! Round ends!')
            coins_players[mana]=coins_players[mana]- sum(pontarismata.values())
            for j in range(1,players+1):
                if j in pontarismata:
                    coins_players[j]=coins_players[j]+pontarismata[j]
            if mana==players:
                mana=1
            else:
                mana=mana+1           
            break
    else:
        print('Banker scored' ,points[0] ,'points')
            

    for i in range(1,players+1):
        if points[0]==7 or points[0]==0:
            break
        if i in pontarismata:
            print('i= ',i)
            if i in pontarismata.keys():
                input('Player '+str(i)+' : press ENTER to roll dice')
            
        
            while True:
                if rolls!=0:
                    print('Player',i, 'rolls again')
                x=[]
                for j in range (3):
                    y=randint(1,6)
                    x.append(y)    
                    x.sort()
                print ('Player',i,' rolled:' ,x)
            
    
                if x[0]==x[1] and x[1]==x[2] or x==[4,5,6] :
                    points[i]=7
                    rolls=0
                    break
                elif x[0]==x[1] and x[2]==6 :
                    points[i]=6
                    rolls=0
                    break
                elif x[0]==1 and x[1]==x[2] or x ==[1,2,3]:
                    points[i]=0
                    rolls=0
                    break
                
                elif x[0] ==x[1] :
                    points[i]=x[2]
                    rolls=0
                    break
                elif x[1] ==x[2]:
                    points[i]=x[0]
                    rolls=0
                    break
                rolls=rolls+1
            
            if points[i]!=7 and points[i]!=0:
                print('Player',i,' scored', points[i] ,'points')
                

        
            if points[0]>points[i]:
                print('Banker wins!')
                coins_players[mana]=coins_players[mana]+pontarismata[i]
                coins_players[i]=coins_players[i] - pontarismata[i]
            elif points[0]<points[i] or points[0]==0:
                print('Player wins!')
                coins_players[i]=coins_players[i]+pontarismata[i]
                coins_players[mana]=coins_players[mana]- pontarismata[i]            
            else:
                print("It's a tie between the banker and the player!")
             
    a=points[0]
    temp=points.copy()
    del temp[0]


    for q in points:
        if points[q]==7 and points[0]!=7:
            mana=q
            break
        elif all(a<x for x in temp.values()) and temp!={}:
            if mana==players:
                mana=1
            else:
                mana=mana+1
            break            
    print()        

    
    print('Current balance:')
    for k in range(1,players+1):
        print('Player',k,'has',coins_players[k],'coins')
for i in coins_players:
    if coins_players[i]==0:
        bankrupt_player=i
        print('Player', bankrupt_player ,'is bankrupt. Game ends.')