import { useQuery } from '@tanstack/react-query';
import { supabase, isConfigured } from '@/lib/supabase';

interface ResponseMetric {
	avgTime: number;
	hasData: boolean;
}

export const useAvgResponseTime = () => {
	return useQuery({
		queryKey: ['avg-response'],
		queryFn: async (): Promise<ResponseMetric> => {
			if (!supabase || !isConfigured) return { avgTime: 0, hasData: false };

			const { data, error } = await supabase
				.from('response_metrics')
				.select('response_time_seconds')
				.order('recorded_at', { ascending: false })
				.limit(50);

			if (error || !data?.length) return { avgTime: 0, hasData: false };

			const avg = Math.round((data.reduce((s, r) => s + r.response_time_seconds, 0) / data.length) * 10) / 10;
			return { avgTime: avg, hasData: true };
		},
		refetchInterval: 5000,
	});
};
