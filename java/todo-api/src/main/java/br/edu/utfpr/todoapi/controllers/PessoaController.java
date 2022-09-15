package br.edu.utfpr.todoapi.controllers;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.utfpr.todoapi.dto.PessoaDTO;
import br.edu.utfpr.todoapi.model.Pessoa;
import br.edu.utfpr.todoapi.repositories.PessoaRepository;

@RestController
@RequestMapping("pessoa")
public class PessoaController {


    @Autowired // Injeção de dependência
    private PessoaRepository pessoaRepository;


    @GetMapping(produces = "application/json")
    public List<Pessoa> getAll() {
        List<Pessoa> pes = new ArrayList<>();
        //pes.add(new Pessoa(1L, "Juca", "aa@aa", "123", 
        //LocalDate.now(), LocalDateTime.now(), LocalDateTime.now()));

        //pes.add(new Pessoa(2L, "Ana", "aa@aa", "123", 
        //LocalDate.now(), LocalDateTime.now(), LocalDateTime.now()));

        return pes;
    }

    @GetMapping("{id}")
    public String getById(@PathVariable String id) {
        return "Obter a pessoa " + id;
    }

    @PostMapping
    public Pessoa save(@RequestBody PessoaDTO pessoaDTO) {
        System.out.println(pessoaDTO);

        Pessoa p = new Pessoa();
        BeanUtils.copyProperties(pessoaDTO, p);

        LocalDateTime now = LocalDateTime.now(ZoneId.of("UTC"));

        p.setCreatedAt(now);
        p.setUpdatedAt(now);
        
        return pessoaRepository.save(p);
    }
    
    @PutMapping("{id}")
    public String update(@PathVariable Long id) {
        return "Atualizar";
    }

    @DeleteMapping("{id}")
    public String delete(@PathVariable Long id) {
        return "deletar";
    }

}
