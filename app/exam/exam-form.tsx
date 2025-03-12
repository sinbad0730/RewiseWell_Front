import { useEffect, useState } from "react";
import { Card, CardContent } from "../challenge/component/card";
import { Label } from "../challenge/component/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../challenge/component/select";
import { Button } from "../challenge/component/button";
import { Slider } from "../challenge/component/slider";
import axios from "axios";
import { API_BASE_URL } from "@/utils/axios";

interface ExamFormProps {
    onGenerate: (data: { subject: any; unit: any; quantity: number; unitName : any; op: string }) => void;
}

export function ExamForm({ onGenerate }: ExamFormProps) {
    const [subject, setSubject] = useState<any>();
    const [unit, setUnit] = useState<any>();
    const [quantity, setQuantity] = useState([5]);
    const [unitName , setUnitName] = useState('');
    const [op , setOp] = useState('');
    const token = JSON.parse(localStorage.getItem('authtoken') as string).access_token;
    const [subjectList, setSubjectList] = useState<any>([]);
    const [unitList, setUnitList] = useState<any>([]);

    const getSubjects = async () => {
        await axios.get(`${API_BASE_URL}/grade-retrieval/get_all_subject`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(async (res) => {
            setSubjectList(res.data);

        }).catch((e) => {
            console.log(e)
        })
    }
    const getUnits = async (id: any) => {
        await axios.get(`${API_BASE_URL}/grade-retrieval/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
          .then((res) => {
            setUnitList(res.data);
    
          }).catch((e) => {
            console.log(e)
          })
      }
    useEffect(() => {
        getSubjects();
    }, []);

    const getUnitName = async (id: any) => {
        const unit = unitList.filter((item: any) => item.unit_id == id) as { unit_id: number; unit_name: string }[];
        setUnitName(unit[0]?.unit_name);
    }
    return (
        <Card className="w-full max-w-md mx-auto bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
            <CardContent className="p-8 space-y-8">
                <div className="space-y-3">
                    <Label className="text-lg font-medium text-emerald-300">Subject</Label>
                    <Select onValueChange={(value) => {setSubject(value) ; getUnits(value);}}>
                        <SelectTrigger className="holographic-input text-white">
                            <SelectValue placeholder="Choose your subject" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900/95 border-white/10">
                            {subjectList.map((subject : any) => (
                                <SelectItem key={subject.subject_id} value={subject.subject_id} className="text-white">
                                    {subject.subject_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-3">
                    <Label className="text-lg font-medium text-emerald-300">Unit</Label>
                    <Select
                        onValueChange={(value) => {setUnit(value); getUnitName(value);}}
                        disabled={!subject}
                    >
                        <SelectTrigger className="holographic-input text-white">
                            <SelectValue placeholder="Select your unit" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900/95 border-white/10">
                            {subject && unitList.map((unit : any) => (
                                <SelectItem key={unit.unit_id} value={unit.unit_id} className="text-white">
                                    {unit.unit_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <Label className="text-lg font-medium text-emerald-300">Questions</Label>
                        <span className="text-white font-mono text-lg">{quantity[0]}</span>
                    </div>
                    <Slider
                        value={quantity}
                        onValueChange={setQuantity}
                        min={1}
                        max={10}
                        step={1}
                        className="[&>span]:bg-emerald-400"
                    />
                </div>

                <Button
                    onClick={() => subject && unit && onGenerate({ subject, unit, quantity: quantity[0], unitName, op: 'paper' })}
                    disabled={!subject || !unit}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 transition-all py-6 text-lg font-medium rounded-lg shadow-lg hover:shadow-emerald-500/25"
                >
                    Generate IGCSE Exam
                </Button>
                <Button
                    onClick={() => subject && unit && onGenerate({ subject, unit, quantity: quantity[0], unitName, op: 'AI' })}
                    disabled={!subject || !unit}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 transition-all py-6 text-lg font-medium rounded-lg shadow-lg hover:shadow-emerald-500/25"
                >
                    Generate AI Exam
                </Button>
            </CardContent>
        </Card>
    );
}