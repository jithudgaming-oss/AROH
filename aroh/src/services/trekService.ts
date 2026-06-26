import { supabase } from '../lib/supabase';
import { Trek } from '../constants/mockData';

export async function fetchTreks(): Promise<Trek[]> {
    const { data, error } = await supabase
        .from('treks')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching treks:', error.message);
        return [];
    }

    return data.map((row: any) => ({
        id: row.id,
        title: row.title,
        difficulty: row.difficulty,
        durationDays: row.duration_days,
        distanceKm: row.distance_km,
        elevationGainM: row.elevation_gain_m,
        maxElevationM: row.max_elevation_m,
        state: row.state,
        district: row.district,
        description: row.description,
        imageUrl: row.image_url,
        status: row.status,
        dataVerifiedDate: row.data_verified_date,
        dataVerifiedDaysAgo: 0,
        permitRequired: row.permit_required,
        permitFeeINR: row.permit_fee_inr,
        startPoint: {
            latitude: row.start_lat,
            longitude: row.start_lng,
            name: row.start_name,
        },
        coordinates: [],
        seasons: row.seasons ?? [],
        days: row.days ?? [],
        costEstimate: row.cost_estimate ?? {},
        safetyTips: row.safety_tips ?? [],
        recommendedGear: row.recommended_gear ?? [],
        healthRequirements: row.health_requirements ?? [],
        offlineDownloaded: false,
    }));
}

export async function fetchTrekById(id: string): Promise<Trek | null> {
    const { data, error } = await supabase
        .from('treks')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching trek:', error.message);
        return null;
    }

    return {
        id: data.id,
        title: data.title,
        difficulty: data.difficulty,
        durationDays: data.duration_days,
        distanceKm: data.distance_km,
        elevationGainM: data.elevation_gain_m,
        maxElevationM: data.max_elevation_m,
        state: data.state,
        district: data.district,
        description: data.description,
        imageUrl: data.image_url,
        status: data.status,
        dataVerifiedDate: data.data_verified_date,
        dataVerifiedDaysAgo: 0,
        permitRequired: data.permit_required,
        permitFeeINR: data.permit_fee_inr,
        startPoint: {
            latitude: data.start_lat,
            longitude: data.start_lng,
            name: data.start_name,
        },
        coordinates: [],
        seasons: data.seasons ?? [],
        days: data.days ?? [],
        costEstimate: data.cost_estimate ?? {},
        safetyTips: data.safety_tips ?? [],
        recommendedGear: data.recommended_gear ?? [],
        healthRequirements: data.health_requirements ?? [],
        offlineDownloaded: false,
    };
}