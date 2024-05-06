import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ImageView from '../shared/ImageView';
import AttributeCode from '../../utils/AttributeCode';
import attributeColor from '../../utils/AttributeColor';
import { Linking } from 'react-native';

const ChampionHeader = ({ factioncode, championName }) => {
    const headerStyle = {
        ...styles.championHeader,
        backgroundColor: attributeColor[factioncode], // Set background color based on faction
    };

    return (
        <View style={headerStyle}>
            <Text style={styles.championFaction}>{AttributeCode[factioncode]}</Text>
            <Text style={styles.championName}>{championName}</Text>
            <ImageView codeimage={factioncode} size={40} />
        </View>
    );
};

const ChampionItem = memo(({ item }) => {
    const championLink = `https://ayumilove.net/raid-shadow-legends-${item.name.toLowerCase()}-skill-mastery-equip-guide/`;
    const factionCode = `FACT-${item.faction}`;
    const rarityCode = `RARI-${item.rarity}`;
    const roleCode = `ROLE-${item.role}`;
    const affinityCode = `AFFI-${item.affinity}`;

    const handleChampionPress = () => {
        Linking.openURL(championLink);
    };

    const rarityStyle = {
        backgroundColor: attributeColor[rarityCode], // Set background color based on rarity
        padding: 10,
        borderRadius: 5,
    };

    return (
        <>
            <ChampionHeader factioncode={factionCode} championName={item.name} />
            <TouchableOpacity style={ styles.championListing } onPress={handleChampionPress}>
                <View style={{ ...styles.championImage, ...rarityStyle }}>
                    <ImageView codeimage={rarityCode} size={25} />
                    <Text>{AttributeCode[rarityCode]}</Text>
                </View>
                <View style={styles.championInfo}>
                    <View style={styles.championStats}>
                        <Text>Primary Damage Stat: {item.primaryDamageStat}</Text>
                        <Text>ATK or DEF Buff: {item.ATKorDEFBuff}</Text>
                        <Text>Book: {item.book}</Text>
                        <Text>Mastery: {item.mastery}</Text>
                        <Text>Damage Bonus: {item.damageBonusFromBooks}</Text>
                        <Text>Damage Grade: {item.damageGrade}</Text>
                        <Text>Target:{item.target}</Text>
                    </View>
                </View>
                <View style={styles.championMeta}>
                    <Text>Total:{item.total}</Text>
                    <Text>Base:{item.base}</Text>
                    <Text>Skills:{item.skill}</Text>
                    <ImageView codeimage={roleCode} size={25} />
                    <Text>{AttributeCode[roleCode]}</Text>
                    <ImageView codeimage={affinityCode} size={25} />
                    <Text>{AttributeCode[affinityCode]}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
});

const styles = StyleSheet.create({
    championHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    championListing: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    championImage: {
        flex: 1,
    },
    championInfo: {
        flex: 2,
        paddingHorizontal: 10,
    },
    championName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    championFaction: {
        fontSize: 14,
        justifyContent: 'space-between',
    },
    championStats: {},
    championMeta: {
        flex: 1,
        alignItems: 'flex-end',
    },
});

export default ChampionItem;
